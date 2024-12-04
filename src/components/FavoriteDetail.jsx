import React, { useEffect } from 'react';
import { Form, Modal, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_FAVORITE, ADD_FAVORITE, CLOSE_MODAL } from '../reducer'; 

/**
 * Form included in a modal used for adding a new Favorite or editing an existing form.
 *
 * @param {Object} favorite - A favorite object
 * @param {boolean} visible - A boolean value for indicating whether the modal needs to be visible or not.
 * @return {JSX.Element}
 * @example
 *
 *     FavoriteDetail({{method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice", key: "1733127909566.203"}, true})
 */
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

    /**
     * update a selected favorite value by dispatching the UPDATE_FAVORITE action to the reducer
     *
     * @param {number} key - key of selected favorite, a random value generated when a new favorite is added
     * @param {string} method - cooking method
     * @param {string} meat - meat type
     * @param {string} sides - side
     * @param {string} drink - drink
     * @return {void}
     * @example
     *
     *     updateFavorite({{method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice", key: "1733127909566.203"})
     */
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

    /**
     * add a new favorite by dispatching the ADD_FAVORITE action to the reducer
     *
     * @param {string} method - cooking method
     * @param {string} meat - meat type
     * @param {string} sides - side
     * @param {string} drink - drink
     * @return {void}
     * @example
     *
     *     addFavorite({{method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice"})
     */
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

    /**
     * close the form by dispatching the CLOSE_MODAL action to the reducer
     *
     * @return {void}
     * @example
     *
     *     onClose()
     */
    const onClose = () => {
        dispatch({ type: CLOSE_MODAL });
    }

    /**
     * antd form function called when users hit the save button, it will update favorite or add a new favorite and close the modal
     * @param {Object} values - form field values
     * @return {void}
     * @example
     *    
     *     onFinish({method: "grill", meat: "fish fillet", sides: "Greek Salad", drink: "apple juice"})
     */
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
