import { useState } from 'react';
import bugImage from '~/assets/bug.svg';
import ideaImage from '~/assets/idea.svg';
import thoughtImage from '~/assets/thought.svg';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImage,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImage,
      alt: 'Imagem de uma lâmpada'
    }
  },
  OTHER: {
    title: 'outro',
    image: {
      source: thoughtImage,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type TFeedback = keyof typeof feedbackTypes;

export function WidgetForm () {
  const [feedbackType, setFeedbackType] = useState<TFeedback | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
      
      { feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={ handleRestartFeedback } />
       ) : (
        <>
          { !feedbackType ? (
              <FeedbackTypeStep onSetFeedbackChanged={ setFeedbackType } />
            ) : (
              <FeedbackContentStep 
                onFeedbackRestartRequest={ handleRestartFeedback }  
                feedbackType={ feedbackType }
                onFeedBackSent={() => setFeedbackSent(true)}
              />
          ) }
        </>
       )
      }

      <footer className='text-xs text-neutral-400'>
        Feito com ❤ pela <a className='underline underline-offset-2' target='_blank' href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}