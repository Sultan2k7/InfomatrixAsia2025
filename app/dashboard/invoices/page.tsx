'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useSWRMutation from 'swr/mutation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const requestSchema = z.object({
  title: z.string().min(5, 'Заголовок должен содержать не менее 5 символов'),
  description: z
    .string()
    .min(10, 'Описание должно содержать не менее 10 символов'),
  type: z.enum(['repair', 'maintenance', 'other']),
  urgency: z.enum(['low', 'medium', 'high']),
});

type RequestFormValues = z.infer<typeof requestSchema>;

async function sendRequest(url: string, { arg }: { arg: RequestFormValues }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить запрос');
  }

  return response.json();
}

export default function DriverRequestPage() {
  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'repair',
      urgency: 'medium',
    },
  });

  const { trigger, isMutating } = useSWRMutation('/api/requests', sendRequest);

  const onSubmit = async (data: RequestFormValues) => {
    try {
      const result = await trigger(data);
      console.log('Запрос отправлен:', result);
      toast({
        title: 'Запрос отправлен',
        description: 'Ваш запрос был успешно отправлен.',
      });
      form.reset();
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      toast({
        title: 'Ошибка отправки',
        description:
          'Произошла ошибка при отправке вашего запроса. Попробуйте еще раз.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Отправить запрос</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Заголовок запроса</FormLabel>
                <FormControl>
                  <Input placeholder="Введите заголовок запроса" {...field} />
                </FormControl>
                <FormDescription>
                  Укажите краткий заголовок для вашего запроса
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Опишите ваш запрос подробно"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Укажите подробное описание вашего запроса
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип запроса</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип запроса" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="repair">Ремонт</SelectItem>
                    <SelectItem value="maintenance">Обслуживание</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Выберите тип запроса, который вы отправляете
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Срочность</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень срочности" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Низкая</SelectItem>
                    <SelectItem value="medium">Средняя</SelectItem>
                    <SelectItem value="high">Высокая</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Укажите срочность вашего запроса
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isMutating}>
            {isMutating ? 'Отправка...' : 'Отправить запрос'}
          </Button>
        </form>
      </Form>
    </div>
  );
}