import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const SettingsDriverRegistration: React.FC = () => {
  const [driverName, setDriverName] = useState('');
  const [isDriver, setIsDriver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserRole = async () => {
      const response = await fetch('/api/user/role', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsDriver(data.role === 'DRIVER');
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось получить роль пользователя',
          variant: 'destructive',
        });
      }
    };

    fetchUserRole();
  }, [toast]);

  const handleRegister = async () => {
    const response = await fetch('/api/user/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ driverName }),
    });

    if (response.ok) {
      toast({
        title: 'Успех',
        description: 'Вы успешно зарегистрировались как водитель',
      });
      setIsDriver(true);
    } else {
      toast({
        title: 'Ошибка',
        description: 'Не удалось зарегистрироваться как водитель',
        variant: 'destructive',
      });
    }
  };

  if (isDriver) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Вы уже зарегистрированы как водитель</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация водителя</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="driver-name">Имя водителя</Label>
          <Input
            id="driver-name"
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <Button className="mt-4" onClick={handleRegister}>
          Зарегистрироваться как водитель
        </Button>
      </CardContent>
    </Card>
  );
};
