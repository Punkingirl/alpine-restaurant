'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Play, Pause, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface KitchenTimerProps {
  orderId: string;
  estimatedTime: number; // in minutes
  startTime?: Date;
  onComplete?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

export default function KitchenTimer({
  orderId,
  estimatedTime,
  startTime,
  onComplete,
  onPause,
  onResume,
}: KitchenTimerProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const estimatedSeconds = estimatedTime * 60;
  const progress = Math.min((timeElapsed / estimatedSeconds) * 100, 100);
  const remainingTime = Math.max(estimatedSeconds - timeElapsed, 0);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  useEffect(() => {
    if (startTime && !isPaused && !isCompleted) {
      setIsRunning(true);
    }
  }, [startTime, isPaused, isCompleted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1;
          if (newTime >= estimatedSeconds) {
            setIsCompleted(true);
            setIsRunning(false);
            onComplete?.();
            return estimatedSeconds;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, isCompleted, estimatedSeconds, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    onPause?.();
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsRunning(true);
    onResume?.();
  };

  const handleReset = () => {
    setTimeElapsed(0);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
  };

  const getStatusColor = () => {
    if (isCompleted) return 'text-green-600';
    if (progress >= 90) return 'text-red-600';
    if (progress >= 75) return 'text-orange-600';
    return 'text-blue-600';
  };

  const getStatusIcon = () => {
    if (isCompleted) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (progress >= 90) return <AlertCircle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-blue-600" />;
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (progress >= 90) return 'Overdue';
    if (progress >= 75) return 'Almost Due';
    return 'In Progress';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Kitchen Timer
        </CardTitle>
        <CardDescription>
          Order #{orderId} - {estimatedTime} minutes estimated
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <Badge className={`${getStatusColor()} border-current`}>
            {getStatusText()}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-center gap-2">
          {!isRunning && !isPaused && !isCompleted && (
            <Button onClick={handleStart} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Start
            </Button>
          )}

          {isRunning && !isPaused && (
            <Button variant="outline" onClick={handlePause} className="flex items-center gap-2">
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}

          {isPaused && (
            <Button onClick={handleResume} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Resume
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
            disabled={isCompleted}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {isCompleted && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800 font-medium">Order completed on time!</p>
          </div>
        )}

        {progress >= 90 && !isCompleted && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800 font-medium">Order is overdue!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 