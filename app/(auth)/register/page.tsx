import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { UserAuthForm } from '@/components/shared/user-auth-form';

export default function RegisterPage() {
  return (
    <>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Войти
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-3xl font-medium">
            3GIS
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;3GIS революционизировал наши логистические операции.
                Отслеживание в реальном времени и детализированные отчеты
                значительно повысили нашу эффективность и стандарты
                безопасности.&rdquo;
              </p>
              <footer className="text-sm">
                Алексей Иванов, Менеджер по логистике
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Создать аккаунт
              </h1>
              <p className="text-sm text-muted-foreground">
                Введите свой email ниже, чтобы создать аккаунт
              </p>
            </div>
            <UserAuthForm type="register" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Нажимая продолжить, вы соглашаетесь с нашими{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Условиями использования
              </Link>{' '}
              и{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
