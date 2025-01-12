'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'register';
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Имя должно содержать не менее 2 символов.',
    })
    .optional(),
  email: z.string().email({
    message: 'Пожалуйста, введите корректный email.',
  }),
  password: z.string().min(8, {
    message: 'Пароль должен содержать не менее 8 символов.',
  }),
});

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const endpoint =
      type === 'login' ? '/api/auth/callback/credentials' : '/api/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        if (type === 'register') {
          toast({
            title: 'Аккаунт создан',
            description: 'Пожалуйста, войдите в систему.',
          });
          router.push('/login');
        } else {
          router.push('/dashboard');
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Произошла ошибка');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description:
          error instanceof Error
            ? error.message
            : 'Произошла неизвестная ошибка',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === 'register' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder="Ваше имя" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle size={16} className="mr-2 animate-spin" />
            )}
            {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
