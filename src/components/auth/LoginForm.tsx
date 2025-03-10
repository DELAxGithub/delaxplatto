import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('有効なメールアドレスを入力してください'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await signIn(data.email);
      setMessage('ログインリンクを送信しました。メールをご確認ください。');
    } catch (error) {
      setMessage('エラーが発生しました。もう一度お試しください。');
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 p-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">ログイン</h1>
        <p className="text-gray-500">
          登録済みのメールアドレスを入力してください
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="メールアドレス"
            {...register('email')}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'sending...' : 'ログインリンクを送信'}
        </Button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-500">{message}</p>
        )}
      </form>
    </div>
  );
}
