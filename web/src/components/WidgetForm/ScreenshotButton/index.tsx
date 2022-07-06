import { useState } from 'react';
import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import { Loading } from '~/components/Loading';

interface ScreenshotButtonProps {
  screenshot: string | null,
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton ({ screenshot ,onScreenshotTook }: ScreenshotButtonProps) {
  const [isTakeScreenshot, setIsTakeScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakeScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTook(base64Image);
    setIsTakeScreenshot(false);
  }

  if(screenshot) {
    return (
      <button
        type='button'
        className='btn-screenshot-with-screenshot'
        onClick={ () => onScreenshotTook(null) }
        style={{
          backgroundImage: `url(${ screenshot })`,
          backgroundPosition: 'right bottom',
          backgroundSize: 100
        }}
      >
        <Trash weight='fill' />
      </button>
    )
  }

  return (
    <button
      type='button'
      onClick={ handleTakeScreenshot }
      className='btn-screenshot-widgetForm'
    >
      { isTakeScreenshot ? <Loading /> : <Camera className='w-6 h-6' /> }
    </button>
  )
}