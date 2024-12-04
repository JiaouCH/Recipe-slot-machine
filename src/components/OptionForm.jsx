import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_OPTION, CLOSE_OPTION_MODAL } from '../reducer';
import { Form, Modal, Input, Button } from 'antd';

/**
   * Form included in a modal used for adding a new Option.
   *
   * @param {string} type - methods/meats/sides/drinks
   * @param {boolean} optionModalVisible - Boolean value indicating whether the modal should be open or not.
   * @return {JSX.Element}
   * @example
   *
   *     OptionForm('methods', true)
   */
const OptionForm = ({ type, optionModalVisible }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    /**
   * dispatch the ADD_OPTION action, which will add the option to the state.
   *
   * @param {string} type - methods/meats/sides/drinks
   * @param {string} option - option
   * @return {void}
   * @example
   *
   *     OptionForm('methods', true)
   */
    const addOptions = (option, type) => {
        dispatch({
            type: ADD_OPTION,
            payload: {
                types: type,
                option: option
            }
        });
    };

    /**
   * dispatch the CLOSE_OPTION_MODAL action, which will close the form modal.
   *
   * @return {void}
   * @example
   *
   *     closeOptionModal()
   */
    const closeOptionModal = () => {
        dispatch({
            type: CLOSE_OPTION_MODAL
        });
    };

    useEffect(() => {
        if (optionModalVisible) {
            form.setFieldsValue({
                option: '' 
            });
        }
    }, [optionModalVisible, form]);
    
    /**
   * function provided by the antd form component. It will be called when the users hit save button, it will dispatch the ADD_OPTION action and close the form modal.
   *
   * @return {void}
   * @example
   *
   *     onFinish()
   */
    const onFinish = (values) => {
        addOptions(values.option, type);
        closeOptionModal();
    };

    return (
        <Modal
            title="Add Option"
            open={optionModalVisible}
            onCancel={closeOptionModal}
            footer={null}
        >
            <Form form={form} onFinish={onFinish}>
                <Form.Item
                    name="option"  
                    label={`${type} Option`}
                    rules={[{ required: true, message: `Please input the ${type}!` }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OptionForm;
