import React, { useEffect } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_FAVORITE, ADD_FAVORITE, CLOSE_MODAL } from '../reducer'; 


const FavoriteDetail = ({ favorite, visible }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (favorite) {
            form.setFieldsValue({
                method: favorite.method,
                meat: favorite.meat,
                sides: favorite.sides,
                drink: favorite.drink
            });
        }
    }, [favorite, form]);

    const updateFavorite = ({key, method, meat, sides, drink}) => {
        dispatch({
          type: UPDATE_FAVORITE,
          payload: {
            favoriteId: key, 
            method: method, 
            meat: meat, 
            sides: sides, 
            drink: drink
          }
        });
      };

    const addFavorite = ({method, meat, sides, drink}) => {
        dispatch({
            type: ADD_FAVORITE,
            payload: {
                method: method,
                meat: meat,
                sides: sides,
                drink: drink
            }
        });
    };


    const onClose = () => {
        dispatch({ type: CLOSE_MODAL });
    }

    const onFinish = (values) => {
        if(favorite){
            const updatedFavorite = {
                key: favorite.key,  
                method: values.method,
                meat: values.meat,
                sides: values.sides,
                drink: values.drink
            };
            updateFavorite(updatedFavorite);
        }  
        else {
            const newFavorite = {
                method: values.method,
                meat: values.meat,
                sides: values.sides,
                drink: values.drink
            };
            addFavorite(newFavorite);
        }
        onClose();  
    };

    return (
        <Modal
            title={favorite ? "Edit Favorite Recipe" : "Add Favorite Recipe"}
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            {visible && (
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Method" name="method" rules={[{ required: true, message: 'Please input the method!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Meat" name="meat" rules={[{ required: true, message: 'Please input the meat!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Sides" name="sides" rules={[{ required: true, message: 'Please input the sides!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Drink" name="drink" rules={[{ required: true, message: 'Please input the drink!' }]}>
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

export default FavoriteDetail;
