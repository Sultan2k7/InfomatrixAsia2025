'use client';

import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SettingsDriverRegistration } from '@/components/shared/settings-driver-registration';

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Настройки</h2>

      {/* User Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Информация профиля</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              type="text"
              defaultValue={session?.user?.name || ''}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={session?.user?.email || ''}
            />
          </div>
          <Button className="mt-4">Сохранить изменения</Button>
        </CardContent>
      </Card>

      {/* Password Change Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Изменение пароля</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Текущий пароль</Label>
            <Input id="current-password" type="password" />
          </div>
          <div>
            <Label htmlFor="new-password">Новый пароль</Label>
            <Input id="new-password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Подтвердите новый пароль</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button className="mt-4">Изменить пароль</Button>
        </CardContent>
      </Card>

      {/* Driver Registration */}
      <SettingsDriverRegistration />
    </div>
  );
}
