'use client';
import { motion } from 'framer-motion';
import { HeroHighlight, Highlight } from '../ui/hero-highlight';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <HeroHighlight className="py-12 sm:py-20 md:py-32 lg:py-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-800 dark:text-white max-w-4xl leading-tight lg:leading-tight text-center mx-auto mb-4 sm:mb-6"
        >
          Добро пожаловать в 3GIS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 max-w-3xl text-center mx-auto mb-6 sm:mb-10"
        >
          Всё, что нужно для безопасной и прозрачной транспортировки нефти — в{' '}
          <Highlight className="text-black dark:text-white font-semibold">
            реальном времени.
          </Highlight>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/login">
            <Button size="lg" className="text-base sm:text-lg">
              Начать работу
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </HeroHighlight>
  );
}