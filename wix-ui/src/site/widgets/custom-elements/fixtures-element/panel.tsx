import React, { useState, useEffect } from 'react';
import { WixProvider, useWixModules } from '@wix/sdk-react';
import { editor, widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

function Panel() {
  const { setProp, getProp } = useWixModules(widget);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    getProp('name').then(name => setName(name ?? 'Wix CLI'));
  }, [getProp, setName]);

  return (
    <SidePanel width="300">
      <SidePanel.Content noPadding stretchVertically>
        <SidePanel.Field>
          <FormField label="Your name">
            <Input
              type="text"
              value={name}
              onChange={(event) => {
                const newName = event.target.value;
                setName(newName);
                setProp('name', newName);
              }}
            />
          </FormField>
        </SidePanel.Field>
      </SidePanel.Content>
    </SidePanel>
  );
}

export default () => (
  <WixProvider host={editor.host()} auth={editor.auth()}>
    <WixDesignSystemProvider>
      <Panel />
    </WixDesignSystemProvider>
  </WixProvider>
);
