import { Container } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapIcon, TruckIcon, BarChartIcon, BellIcon } from 'lucide-react';

const steps = [
  {
    title: 'Подключение транспорта',
    description:
      'Установка GPS-трекеров и датчиков на все транспортные средства для отслеживания.',
    icon: TruckIcon,
  },
  {
    title: 'Мониторинг маршрутов',
    description:
      'Отслеживание движения в реальном времени и анализ оптимальных маршрутов.',
    icon: MapIcon,
  },
  {
    title: 'Анализ данных',
    description:
      'Сбор и обработка данных о перевозках для оптимизации процессов.',
    icon: BarChartIcon,
  },
  {
    title: 'Оповещения и реагирование',
    description:
      'Мгновенные уведомления о нарушениях и быстрое реагирование на инциденты.',
    icon: BellIcon,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
            Как работает 3GIS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой процесс для обеспечения безопасности и эффективности
            транспортировки нефти
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-primary/20">
                  <step.icon className="w-6 h-6 text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
                </div>
                <CardTitle className="transition-all duration-300 ease-in-out group-hover:text-primary">
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground transition-all duration-300 ease-in-out group-hover:text-foreground">
                  {step.description}
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
