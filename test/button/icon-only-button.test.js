import React from 'react';
import * as enzyme from 'enzyme';
import { expect } from 'chai';

import Button from '../../../../src/components/button/button';
import IconOnlyButton, { CLASS_NAMES } from '../../../../src/components/button/icon-only-button';

describe('IconOnlyButton', function () {

  it('exports CLASS_NAMES with at least BLOCK', function () {
    expect(CLASS_NAMES).to.include.keys('BLOCK');
  });

  describe('different properties', function () {
    const requiredProps = {
      iconName: 'add',
      onClick: function () {},
    };

    it('should render with minimal required properties [enzyme]', function () {
      const wrapper = enzyme.shallow(
        <IconOnlyButton {...requiredProps} />
      );
      expect(wrapper.find(Button).prop('className')).to.contain(CLASS_NAMES.BLOCK);
    });

  });

});