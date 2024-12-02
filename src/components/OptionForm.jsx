import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_OPTION, CLOSE_OPTION_MODAL } from '../reducer';
import { Form, Modal, Input, Button } from 'antd';

const OptionForm = ({ type, optionModalVisible }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const addOptions = (option, type) => {
        dispatch({
            type: ADD_OPTION,
            payload: {
                types: type,
                option: option
            }
        });
    };

    const closeOptionModal = () => {
        dispatch({
            type: CLOSE_OPTION_MODAL
        });
    };

    useEffect(() => {
        form.setFieldsValue({
            option: '' 
        });
    }, [form]);

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
            {optionModalVisible && (
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
            )}
        </Modal>
    );
};

export default OptionForm;
