import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';

import InputWithIcon from '../../../../src/components/input/input-with-icon';
import Input from '../../../../src/components/input/input';
import Icon from '../../../../src/components/icon/svg-icon';

const CLASS_NAMES = {
  BLOCK: 'input-icon-wrapper',
  DISABLED: 'input-icon-wrapper--disabled',
  ERROR: 'input-icon-wrapper--error',
  VALID: 'input-icon-wrapper--valid',
  ICON: 'input-icon-wrapper__icon'
};

const onChange = event => {
  return event;
};

const propsWithoutValue = {
  onChange: onChange,
  className: 'custom-class-name',
  required: true,
  id: 'custom-id',
  iconName: 'filter',
};

const props = Object.assign({ value: 'initial value' }, propsWithoutValue);

const {iconName} =  props;

const visibleIconProps = {
  iconName,
  className: CLASS_NAMES.ICON,
  visible: true,
  disabled: false,
};

const invisibleIconProps = {
  iconName,
  className: CLASS_NAMES.ICON,
  visible: false,
  disabled: false,
};

const shallowRenderFilteringInput = (props) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(<InputWithIcon {...props} />);
  return renderer.getRenderOutput();
};

describe('InputWithIcon component', function () {

  it('renders the wrapper', () => {

    const inputWithIcon = shallowRenderFilteringInput(props);
    expect(inputWithIcon.type).to.equal('div');
    expect(inputWithIcon.props.className).to.equal(`${CLASS_NAMES.BLOCK} ${props.className}`);

  });

  it('renders Input component', () => {
    const nestedInput = shallowRenderFilteringInput(props).props.children[0];
    const { onChange, value, id, required } =  props;
    const inputProps = { onChange, value, required, id };
    expect(nestedInput.type).to.equal(Input);
    expect(nestedInput.props).to.deep.equal(inputProps); // This tests that correct props are passed through to the input-element.

  });

  it('renders hidden Icon component because of value prop', () => {
    const nestedHiddenIcon = shallowRenderFilteringInput(props).props.children[1];
    expect(nestedHiddenIcon.type).to.equal(Icon);
    expect(nestedHiddenIcon.props).to.deep.equal(invisibleIconProps);
  });

  it('renders always icon if alwaysVisibleIcon is set ', () => {

    const alwaysVisibleIconProps = Object.assign({ alwaysVisibleIcon: true }, props);
    const renderedIcon = shallowRenderFilteringInput(alwaysVisibleIconProps).props.children[1];
    expect(renderedIcon.type).to.equal(Icon);
    expect(renderedIcon.props).to.deep.equal(visibleIconProps);

  });

  it('renders hidden Icon component because of defaultValue prop', () => {

    const propsWithDefaultValue = Object.assign({defaultValue: 'default value'}, propsWithoutValue);
    const nestedHiddenIcon = shallowRenderFilteringInput(propsWithDefaultValue).props.children[1];
    expect(nestedHiddenIcon.type).to.equal(Icon);
    expect(nestedHiddenIcon.props).to.deep.equal(invisibleIconProps);

  });

  it('renders visible Icon component', () => {

    const nestedHiddenIcon = shallowRenderFilteringInput(propsWithoutValue).props.children[1];
    expect(nestedHiddenIcon.type).to.equal(Icon);
    expect(nestedHiddenIcon.props).to.deep.equal(visibleIconProps);

  });

  it('toggles the Icon in case of uncontrolled usage', () => {

    // Input does not have value
    const inputWithIcon = TestUtils.renderIntoDocument(<InputWithIcon {...propsWithoutValue} />);
    const icon = TestUtils.scryRenderedDOMComponentsWithClass(inputWithIcon, 'icon');
    expect(icon.length).to.equal(1);

    // Change the value
    const input = TestUtils.findRenderedDOMComponentWithTag(inputWithIcon, 'input');
    input.value = 'text';
    TestUtils.Simulate.change(input);

    // Should not have the Icon
    const emptyArrayOfIcons = TestUtils.scryRenderedDOMComponentsWithClass(inputWithIcon, 'icon');
    expect(emptyArrayOfIcons.length).to.equal(0);

  });

  it('add disabled, valid and error modifier classes ', () => {

    const isDisabledProps = Object.assign({ isDisabled: true }, props);
    const isValidProps = Object.assign({ isValid: true }, props);
    const isErrorProps = Object.assign({ isError: true }, props);

    const disabledInputWithIcon = shallowRenderFilteringInput(isDisabledProps);
    expect(disabledInputWithIcon.props.className).to.equal(`${CLASS_NAMES.BLOCK} ${props.className} ${CLASS_NAMES.DISABLED}`);

    const erroneousInputWithIcon = shallowRenderFilteringInput(isErrorProps);
    expect(erroneousInputWithIcon.props.className).to.equal(`${CLASS_NAMES.BLOCK} ${props.className} ${CLASS_NAMES.ERROR}`);

    const validInputWithIcon = shallowRenderFilteringInput(isValidProps);
    expect(validInputWithIcon.props.className).to.equal(`${CLASS_NAMES.BLOCK} ${props.className} ${CLASS_NAMES.VALID}`);

  });

});
