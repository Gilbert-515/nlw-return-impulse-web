import { CloseButton } from '~/components/CloseButton';
import { feedbackTypes, TFeedback } from '..';

interface FeedbackTypeStepProps {
  onSetFeedbackChanged: (type: TFeedback) => void;
}

export function FeedbackTypeStep ({ onSetFeedbackChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className='text-xl leading-6'>Deixe seu feedback</span>
        <CloseButton/>
      </header>
      <div className='flex py-8 gap-8 w-full'>
        { Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <button
                key={ key }
                className='card-widgetForm'
                type='button'
                onClick={() => onSetFeedbackChanged(key as TFeedback)}
              >
                <img src={ value.image.source } alt={ value.image.alt} />
                <span>{ value.title }</span>
              </button>
            );
          }) 
        }
      </div>
    </>
  )
}