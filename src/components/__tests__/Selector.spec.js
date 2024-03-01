import { shallowMount } from '@vue/test-utils';
import { beforeEach, describe, test, expect } from 'vitest';
import { nextTick } from 'vue';

// Undet test
import Selector from '../Selector.vue';

describe('Selector component test', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Selector);
  });

  test('should select grid option', async () => {
    await wrapper.find('.selector__item').trigger('click');
    await nextTick();
    await wrapper.find('[data-test="item-grid"]').trigger('click');
    expect(wrapper.vm.currentSelected).toBe('grid');
  });
});
