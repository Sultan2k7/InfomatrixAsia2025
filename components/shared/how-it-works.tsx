import { Container } from '@/components/shared'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapIcon, TruckIcon, BarChartIcon, BellIcon } from 'lucide-react'
import { AwesomeCarousel } from '@/components/ui/awesome-carousel'

const steps = [
  {
    id: 1,
    title: 'Подключение транспорта',
    description: 'Установка GPS-трекеров и датчиков на все транспортные средства для отслеживания.',
    icon: TruckIcon,
  },
  {
    id: 2,
    title: 'Мониторинг маршрутов',
    description: 'Отслеживание движения в реальном времени и анализ оптимальных маршрутов.',
    icon: MapIcon,
  },
  {
    id: 3,
    title: 'Анализ данных',
    description: 'Сбор и обработка данных о перевозках для оптимизации процессов.',
    icon: BarChartIcon,
  },
  {
    id: 4,
    title: 'Оповещения и реагирование',
    description: 'Мгновенные уведомления о нарушениях и быстрое реагирование на инциденты.',
    icon: BellIcon,
  },
]

export function HowItWorks() {
  const carouselItems = steps.map((step) => ({
    id: step.id,
    content: (
      <Card className="w-full max-w-sm mx-auto h-full group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
        <CardHeader className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-primary/20">
            <step.icon className="w-6 h-6 text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
          </div>
          <CardTitle className="transition-all duration-300 ease-in-out group-hover:text-primary">
            {step.id}. {step.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <p className="text-sm sm:text-base text-muted-foreground transition-all duration-300 ease-in-out group-hover:text-foreground">
            {step.description}
          </p>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
      </Card>
    ),
  }))

  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-background">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
            Как работает 3GIS
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой процесс для обеспечения безопасности и эффективности транспортировки нефти
          </p>
        </div>
        <div className="pb-12">
          <AwesomeCarousel items={carouselItems} />
        </div>
      </Container>
    </section>
  )
}

