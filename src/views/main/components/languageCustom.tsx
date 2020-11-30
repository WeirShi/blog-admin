import { FC, useContext } from 'react';
import { Dropdown, Menu } from 'antd';
import { LanguageIcon } from '@/components/custom-icons';
import C from '@/store/provider';

const defaultLangUConfigMap = {
    'en-US': {
      lang: 'en-US',
      label: 'English',
      icon: '🇺🇸',
      title: 'Language'
    },
    'zh-CN': {
      lang: 'zh-CN',
      label: '简体中文',
      icon: '🇨🇳',
      title: '语言'
    },
    // 'zh-TW': {
    //   lang: 'zh-TW',
    //   label: '繁体中文',
    //   icon: '🇭🇰',
    //   title: '語言'
    // }
};
const menuItemStyle = { minWidth: '160px' }

const LanguageCustom: FC = () => {
    const context = useContext(C);
    const handleClick = (e) => {
        context.changeLocale(e.key);
    }
    const LanguageMenu = (
        <Menu selectedKeys={[context.locale]} onClick={handleClick}>
            <Menu.Item key={'en-US'} style={menuItemStyle}>
                <span role='img' aria-label={defaultLangUConfigMap['en-US']?.label  || 'en-US'}>
                    {defaultLangUConfigMap['en-US']?.icon || "🌐"}
                </span>{' '}
                {defaultLangUConfigMap['en-US']?.label || 'en-US'}
            </Menu.Item>
            <Menu.Item key={'zh-CN'} style={menuItemStyle}>
                <span role='img' aria-label={defaultLangUConfigMap['zh-CN']?.label  || 'zh-CN'}>
                    {defaultLangUConfigMap['zh-CN']?.icon || "🌐"}
                </span>{' '}
                {defaultLangUConfigMap['zh-CN']?.label || 'zh-CN'}
            </Menu.Item>
            {/* <Menu.Item key={'zh-TW'} style={menuItemStyle}>
                <span role='img' aria-label={defaultLangUConfigMap['zh-TW']?.label  || 'zh-TW'}>
                    {defaultLangUConfigMap['zh-TW']?.icon || "🌐"}
                </span>{' '}
                {defaultLangUConfigMap['zh-TW']?.label || 'zh-TW'}
            </Menu.Item> */}
        </Menu>
    );
    return (
        <Dropdown overlay={LanguageMenu} className="selectLan">
            <LanguageIcon />
        </Dropdown>
    )
}


export default LanguageCustom;
