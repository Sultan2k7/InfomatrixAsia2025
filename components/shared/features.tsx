import { Container } from '@/components/shared';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Shield, BarChart3, Truck } from 'lucide-react';

const features = [
  {
    title: 'Отслеживание в реальном времени',
    description:
      'Мониторинг местоположения и состояния транспортных средств в режиме реального времени.',
    icon: MapPin,
  },
  {
    title: 'Усиленная безопасность',
    description:
      'Передовые системы оповещения и протоколы безопасности для предотвращения инцидентов.',
    icon: Shield,
  },
  {
    title: 'Аналитика и отчетность',
    description:
      'Подробные аналитические данные и настраиваемые отчеты для оптимизации операций.',
    icon: BarChart3,
  },
  {
    title: 'Управление автопарком',
    description:
      'Эффективное управление и обслуживание вашего автопарка для максимальной производительности.',
    icon: Truck,
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Преимущества 3GIS
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Инновационные решения для безопасной и эффективной транспортировки
            нефти
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-background relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-300 ease-in-out" />
              <CardHeader className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-primary/20">
                  <feature.icon className="w-6 h-6 text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
                </div>
                <CardTitle className="transition-all duration-300 ease-in-out group-hover:text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="transition-all duration-300 ease-in-out group-hover:text-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
