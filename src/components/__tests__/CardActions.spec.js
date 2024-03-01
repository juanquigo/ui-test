import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { beforeEach, describe, test, expect, vi } from 'vitest';

// Store
import { useCounterStore } from '../../stores/counter';

// Components
import ThumbButtonVue from '../ThumbButton.vue';

// Mock
import mockPerson from './mock.json';

// Undet test
import CardActions from '../CardActions.vue';

describe('Card actions component test', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    wrapper = shallowMount(CardActions, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              counter: {
                persons: [mockPerson]
              }
            }
          })
        ]
      },
      props: {
        id: 'fake_id',
        currentThumb: 'up',
        hasVoted: false
      }
    });
    store = useCounterStore();
  });

  test('should render vote again correclty', async () => {
    expect(wrapper.find('[data-test="vote-button"]').text()).toBe('Vote now');
    await wrapper.setProps({
      hasVoted: true
    });
    expect(wrapper.find('[data-test="vote-button"]').text()).toBe('Vote again');
  });

  test('should set current thumb', () => {
    const thumbButtons = wrapper.findAllComponents(ThumbButtonVue);
    thumbButtons.at(0).vm.$emit('thumb-click', 'up');
    expect(store.setCurrentThumb).toBeCalledWith('fake_id', 'up');
    thumbButtons.at(1).vm.$emit('thumb-click', 'down');
    expect(store.setCurrentThumb).toBeCalledWith('fake_id', 'down');
  });

  test('should send vote', async () => {
    await wrapper.find('[data-test="vote-button"]').trigger('click');
    expect(store.setVote).toBeCalledWith('fake_id');
  });
});
