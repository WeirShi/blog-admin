import { FC } from 'react';
import { Modal } from 'antd';
import { ModalOptions } from '../type';

type Options = ModalOptions & {
    cancel: (visible: boolean) => void;
}

const AddCategoryModal: FC<Options> = props => {
    console.log('AddCategoryModal', props);
    const { visible, title, cancel } = props;
    const saveCategoryModal = () => {}

    return (
        <Modal
          title={title}
          centered
          visible={visible}
          okText="保存"
          onOk={saveCategoryModal}
          onCancel={() => { cancel(false) }}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
    )
}

export default AddCategoryModal;
