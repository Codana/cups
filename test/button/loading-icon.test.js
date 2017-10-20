import React from 'react';
import * as enzyme from 'enzyme';
import { expect } from 'chai';

import LoadingIcon, { CLASS_NAMES } from '../../../../src/components/loading-icon/loading-icon';

describe('LoadingIcon', function () {

  it('exports CLASS_NAMES with at least BLOCK', function () {
    expect(CLASS_NAMES).to.include.keys('BLOCK');
  });

  describe('different properties', function () {
    const requiredProps = {};

    it('should render with minimal required properties [enzyme]', function () {
      const wrapper = enzyme.shallow(
        <LoadingIcon {...requiredProps} />
      );
      expect(wrapper.prop('className')).to.contain(CLASS_NAMES.BLOCK);
      expect(wrapper.prop('data-test-key')).to.equal('loading-icon');
    });

    it('should render with custom data-test-key [enzyme]', function () {
      const wrapper = enzyme.shallow(
        <LoadingIcon {...requiredProps} data-test-key="foo" />
      );
      expect(wrapper.prop('data-test-key')).to.equal('foo');
    });

    it('should render with custom className [enzyme]', function () {
      const wrapper = enzyme.shallow(
        <LoadingIcon {...requiredProps} className="foo" />
      );
      expect(wrapper.prop('className')).to.contain(CLASS_NAMES.BLOCK);
      expect(wrapper.prop('className')).to.contain('foo');
    });

  });

});