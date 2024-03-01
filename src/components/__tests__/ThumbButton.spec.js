import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';

// Undet test
import ThumbButton from '../ThumbButton.vue';

describe('Thumb button component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ThumbButton, {
      props: {
        variant: 'up',
        isClickable: false,
        isActive: false
      }
    });
  });

  test('should emit event on click', async () => {
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('thumb-click');
    await wrapper.setProps({
      isClickable: true
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('thumb-click');
  });

  test('should emit event with variant', async () => {
    await wrapper.setProps({
      isClickable: true,
      isActive: true
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('thumb-click')[0]).toMatchObject([null]);
    await wrapper.setProps({
      isActive: false
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('thumb-click')[1]).toMatchObject(['up']);
  });
});
