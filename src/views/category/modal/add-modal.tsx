import { FC, useState, useEffect, createRef } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { ModalOptions } from '../type';
import { FetchUpdateCategory, FetchAddCategory } from '@/api';

type Options = ModalOptions & {
    cancel: (visible: boolean) => void;
    confirm: () => void;
}

const AddCategoryModal: FC<Options> = props => {
    // const [form] = Form.useForm();
    const formRef = createRef<FormInstance>();

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const { visible, title, name, sort, id, cancel, confirm } = props;
    

    useEffect(() => {
        formRef.current?.setFieldsValue({
            name,
            sort
        })
    }, [formRef, name, sort]);
    const saveCategoryModal = async () => {
        formRef.current?.validateFields()
            .then(async ({ name, sort })=> {
                setConfirmLoading(true);
                const res = id
                    ? await FetchUpdateCategory({ id, sort, name })
                    : await FetchAddCategory({ sort, name });
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
                <Form.Item name="name" label="分类名称"
                    rules={[
                        {
                            required: true,
                            message: "请输入分类名称",
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
                <Form.Item name="sort" label="分类排序"
                    rules={[
                        {
                            required: true,
                            message: "请输入分类排序",
                        },
                    ]}
                >
                    <InputNumber placeholder="请输入分类排序" style={{width: '100%'}}
                        min={1}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCategoryModal;
