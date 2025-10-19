import { render, screen } from '@testing-library/react';
import TaskForm from '../features/tasks/TaskForm';
import { Provider } from 'react-redux';
import { store } from '../app/store';

describe('TaskForm Component', () => {
  it('renders title and description inputs', () => {
    render(
      <Provider store={store}>
        <TaskForm clearEdit={() => {}} />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/enter task title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add more details/i)).toBeInTheDocument();
  });
});
