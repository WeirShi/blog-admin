import { FC, useEffect, useState, createRef } from 'react';
import { Modal, Form, Input, InputNumber, message, Button, Dropdown, Menu } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ModalOptions } from '../type';
import { FetchUpdateTag, FetchAddTag } from '@/api';
import { SketchPicker } from 'react-color';

type Options = ModalOptions & {
    cancel: (visible: boolean) => void;
    confirm: () => void;
    onColorChange: (color: string) => void;
}

const AddTagModal: FC<Options> = props => {
    const formRef = createRef<FormInstance>();
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [colorSelect, setColorSelect] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    const { visible, title, name, sort, id, color, cancel, confirm, onColorChange } = props;
    useEffect(() => {
        formRef.current?.setFieldsValue({
            name,
            sort,
            color
        })
    }, [formRef, name, sort, color]);

    const saveCategoryModal = async () => {
        formRef.current?.validateFields()
            .then(async ({ name, sort, color })=> {
                setConfirmLoading(true);
                const res = id
                    ? await FetchUpdateTag({ id, sort, name, color })
                    : await FetchAddTag({ sort, name, color });
                setConfirmLoading(false);
                if (res.statusCode === 0) {
                    confirm();
                    message.success(res.message);
                } else {
                    message.error(res.message);
                }
            })
            .catch(error => {
                message.error('请完整填写表单内容');
            })
    }

    const cancelCategoryModal = () => {
        if (confirmLoading) { return; }
        cancel(false);
    }

    const handleChangeComplete = (color) => {
        setColorSelect(color.hex);
    }

    const handleChange = (color, event) => {
        setColorSelect(color.hex);
    }

    const saveColor = () => {
        setDropdownVisible(false);
        onColorChange(colorSelect);
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <SketchPicker
                    width='300px'
                    color={ colorSelect || '#fff' }
                    onChangeComplete={ handleChangeComplete }
                    onChange={ handleChange }
                />

                <Button
                    style={{ marginTop: 10 }}
                    type="primary"
                    size="small"
                    onClick={ saveColor }>确定</Button>
            </Menu.Item>
        </Menu>
    );

    

    return (
        <Modal
            title={title}
            centered
            visible={visible}
            maskClosable={false}
            okText="保存"
            confirmLoading={confirmLoading}
            onOk={saveCategoryModal}
            onCancel={cancelCategoryModal}
        >
            <Form ref={formRef}>
                <Form.Item name="name" label="标签名称"
                    rules={[
                        {
                            required: true,
                            message: "请输入标签名称",
                        },
                    ]}
                >
                    <Input placeholder="请输入标签名称" />
                </Form.Item>
                <Form.Item name="sort" label="标签排序"
                    rules={[
                        {
                            required: true,
                            message: "请输入标签排序",
                        },
                    ]}
                >
                    <InputNumber placeholder="请输入标签排序" style={{width: '100%'}}
                        min={1}
                    />
                </Form.Item>
                <Form.Item name="color" label="标签色值"
                    rules={[
                        {
                            required: true,
                            message: "请选择标签色值",
                        },
                    ]}
                >
                    <Input placeholder="请选择标签色值" disabled />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        sm: { span: 16, offset: 4 },
                    }}
                >
                    <Dropdown
                        overlay={menu}
                        visible={dropdownVisible}
                        placement="bottomLeft"
                        trigger={['click']}
                        arrow
                    >
                        <Button type="primary" style={{marginTop: 10}} onClick={() => setDropdownVisible(true)}>选择色值</Button>
                    </Dropdown>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddTagModal;
