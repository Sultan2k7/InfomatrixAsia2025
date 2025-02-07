import { Container } from '@/components/shared'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Shield, BarChart3, Truck } from 'lucide-react'
import { AwesomeCarousel } from '@/components/ui/awesome-carousel'

const features = [
  {
    id: 1,
    title: 'Отслеживание в реальном времени',
    description: 'Мониторинг местоположения и состояния транспортных средств в режиме реального времени.',
    icon: MapPin,
  },
  {
    id: 2,
    title: 'Усиленная безопасность',
    description: 'Передовые системы оповещения и протоколы безопасности для предотвращения инцидентов.',
    icon: Shield,
  },
  {
    id: 3,
    title: 'Аналитика и отчетность',
    description: 'Подробные аналитические данные и настраиваемые отчеты для оптимизации операций.',
    icon: BarChart3,
  },
  {
    id: 4,
    title: 'Управление автопарком',
    description: 'Эффективное управление и обслуживание вашего автопарка для максимальной производительности.',
    icon: Truck,
  },
]

export function Features() {
  const carouselItems = features.map((feature) => ({
    id: feature.id,
    content: (
      <FeatureCard {...feature} />
    ),
  }))

  return (
    <section id="features" className="py-12 sm:py-20 bg-muted">
      <Container>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            Преимущества 3GIS
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">
            Инновационные решения для безопасной и эффективной транспортировки нефти
          </p>
        </div>
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
        <div className="lg:hidden">
          <div className="pb-12">
            <AwesomeCarousel 
              items={carouselItems} 
              className="sm:scale-110 sm:mt-8" 
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

function FeatureCard({ title, description, icon: Icon }: {
  title: string
  description: string
  icon: typeof MapPin
}) {
  return (
    <Card className="w-full max-w-sm mx-auto h-full bg-background relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      <CardHeader className="relative z-10">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-primary/20">
          <Icon className="w-6 h-6 text-primary transition-all duration-300 ease-in-out group-hover:scale-110" />
        </div>
        <CardTitle className="transition-all duration-300 ease-in-out group-hover:text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="transition-all duration-300 ease-in-out group-hover:text-foreground">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}