import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMail = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMail }
);

describe('Submit feedback', () => {

  it('should be able to submit feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment test',
      screenshot: 'data:image/png;base64,testestestses'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to submit feedback whitout type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'comment test',
      screenshot: 'data:image/png;base64,testestestses'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback whitout comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,testestestses'
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with screenshot invalid format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment test',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  });

})
