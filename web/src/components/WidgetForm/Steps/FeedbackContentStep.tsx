import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { CloseButton, Loading } from '~/components';
import { TFeedback, feedbackTypes } from '..';
import { ScreenshotButton } from '../ScreenshotButton';
import { api } from '~/lib/api';

interface FeedbackContentStepProps {
  feedbackType: TFeedback;
  onFeedbackRestartRequest: () => void;
  onFeedBackSent: () => void;
}

export function FeedbackContentStep ({ 
  feedbackType, 
  onFeedbackRestartRequest, 
  onFeedBackSent 
}: FeedbackContentStepProps) {
  
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    });

    setIsSendingFeedback(false);
    onFeedBackSent();
  }

  return (
    <>
      <header>
        <button type='button' onClick={ onFeedbackRestartRequest } className='top-5 left-5 absolute text-zinc-400 hover:text-zinc-100'>
          <ArrowLeft width='bold' className='w-4 h-4' />
        </button>

        <span className='text-xl leading-6 flex items-center gap-2'>
          <img src={ feedbackTypeInfo.image.source } alt={ feedbackTypeInfo.image.alt } className='w-6 h-6' />
          { feedbackTypeInfo.title }
        </span>
        <CloseButton/>
      </header>
      
      <form className='my-4 w-full' onSubmit={ handleSubmitFeedback }>
        <textarea 
          className='textarea-widgetForm'
          placeholder='Conte com detalhes o que está acontecendo...'
          onChange={ event => setComment(event.target.value) }
        />

        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton 
            onScreenshotTook={ setScreenshot } 
            screenshot={ screenshot }
          />

          <button 
            className='btn-submit-widgetForm'
            disabled={ comment.length === 0 || isSendingFeedback }
          >
            { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
          </button>
        </footer>
      </form>
    </>
  )
}