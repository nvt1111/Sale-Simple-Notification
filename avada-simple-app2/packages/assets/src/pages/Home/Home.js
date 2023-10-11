import React, {useEffect, useState} from 'react';
import {Layout, Page, SettingToggle, TextStyle} from '@shopify/polaris';
import {useStore} from '@assets/reducers/storeReducer';
import {api} from "@assets/helpers";

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
    const [enabled, setEnabled] = useState(false);
    const {dispatch} = useStore();

    // async function callApi() {
    //     const data = await api('/samples')
    // }
    //
    // useEffect(() => {
    //     callApi()
    // }, []);

    return (
        <Page fullWidth title="Home">
            <Layout>
                <Layout.Section>
                    <SettingToggle
                        action={{
                            content: enabled ? 'Disable' : 'Enable',
                            onAction() {
                                setEnabled(prev => !prev);
                            }
                        }}
                        enabled={enabled}
                    >
                        <TextStyle>App status is <strong>{enabled ? 'enabled' : 'disabled'}</strong> </TextStyle>
                    </SettingToggle>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
