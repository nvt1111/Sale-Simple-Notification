import {
  Card,
  Checkbox,
  FormLayout,
  Layout,
  Page,
  RangeSlider,
  Stack,
  Tabs,
  TextField,
  Select,
  SkeletonPage,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText
} from '@shopify/polaris';
import React, {useState} from 'react';
import '../../styles/components/notification/setting.scss';
import DesktopPositionInput from '../../components/DesktopPositionInput/DesktopPositionInput';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';
import defaultSettings from '@functions/const/defaultSettings';
import useEditApi from '@assets/hooks/api/useEditApi';

export default function Settings() {
  const [selected, setSelected] = useState(0);
  const {data: input, setData: setInput, loading, setLoading} = useFetchApi({
    url: '/settings',
    defaultSettings
  });
  const handleInputChange = (key, value) => {
    // /  cô san
    setInput(prevInput => ({
      ...prevInput,
      [key]: value
    }));
  };
  const handleTabChange = selectedTabIndex => setSelected(selectedTabIndex);

  const items = [
    {
      id: '1',
      firstName: 'John Doe',
      city: 'New York',
      country: 'United States',
      productName: 'Puffer Jacket With Hidden Hood',
      createdAt: `${new Date()}`,
      productImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtaPRnmNQdkAJwCPopnJfCs8iIbBwAYKNIhBU2aT_h&s',
      settings: {hideTimeAgo: false, truncateProductName: false}
    }
  ];

  const defaultOptions = [
    {label: 'Bottom left', value: 'bottom-left'},
    {label: 'Bottom right', value: 'bottom-right'},
    {label: 'Top left', value: 'top-left'},
    {label: 'Top right', value: 'top-right'}
  ];

  const {handleEdit} = useEditApi({url: '/settings'});
  const saveSetting = async () => {
    setLoading(true);
    try {
      await handleEdit(input);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: '1',
      content: 'Display',
      accessibilityLabel: 'Appearance',
      panelID: 'panel1',
      body: (
        <DisplaySetting
          handleInputChange={handleInputChange}
          defaultOptions={defaultOptions}
          input={input}
        />
      )
    },
    {
      id: '2',
      content: 'Triggers',
      panelID: 'panel2',
      body: <TriggerSetting handleInputChange={handleInputChange} input={input}/>
    }
  ];

  return (
    <Page
      fullWidth
      title="Settings"
      subtitle="Decide how your notification will display"
      primaryAction={{
        content: 'Save',
        onAction: saveSetting
      }}
    >
      {loading && <Skeleton/>}
      {!loading && (
        <Layout>
          <Layout.Section secondary>
            {items.map((item, index) => (
              <NotificationPopup
                key={index}
                id={item.id}
                firstName={item.firstName}
                city={item.city}
                country={item.country}
                productName={item.productName}
                createdAt={item.createdAt}
                productImage={item.productImage}
                hideTimeAgo={input.hideTimeAgo}
                truncateProductName={input.truncateProductName}
              />
            ))}
          </Layout.Section>
          <Layout.Section sectioned>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                {tabs[selected].body}
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}

const TriggerSetting = ({handleInputChange, input}) => {
  return (
    <Card.Section title="PAGES RESTICTION">
      <FormLayout>
        <Select
          labelHidden
          label="Collection rule type"
          options={['Specific pages', 'All pages']}
          value={input.allowShow === 'all' ? 'All pages' : 'Specific pages'}
          onChange={value => {
            if (value === 'Specific pages') {
              handleInputChange('allowShow', 'specific');
            } else {
              handleInputChange('allowShow', 'all');
            }
          }}
        />
        {input.allowShow === 'specific' && (
          <TextField
            label="Include pages"
            type="url"
            autoComplete="off"
            multiline={4}
            helpText="Page URLS to show the pop-up(separated by new lines)"
          />
        )}
        {(input.allowShow === 'all' || input.allowShow === 'specific') && (
          <TextField
            label="Exclude pages"
            type="url"
            autoComplete="off"
            multiline={4}
            helpText="Page URLS NOT to show the pop-up(separated by new lines)"
          />
        )}
      </FormLayout>
    </Card.Section>
  );
};

const DisplaySetting = ({handleInputChange, defaultOptions, input}) => {
  return (
    <>
      <Card.Section title="Appearence">
        <Stack distribution="leading">
          <DesktopPositionInput
            label="Desktop Position"
            onChange={handleInputChange}
            helpText={`The display position of the ${input.position} on your website`}
            options={defaultOptions}
            position={input.position}
          />
        </Stack>
        <br></br>
        <Stack distribution="leading" vertical>
          <Checkbox
            label="Hide time ago"
            checked={input.hideTimeAgo}
            onChange={value => {
              handleInputChange('hideTimeAgo', value);
            }}
          />

          <Checkbox
            label="Truncate content text"
            checked={input.truncateProductName}
            onChange={value => handleInputChange('truncateProductName', value)}
            helpText="If your product name is long for one line, it will be truncated 'Product na=..' "
          />
        </Stack>
      </Card.Section>

      <Card.Section title="TIMING">
        <FormLayout>
          <FormLayout.Group>
            <RangeSlider
              helpText="How long each pop will display on your app"
              output
              label="Display duration"
              min={0}
              max={100}
              value={input.displayDuration || 0}
              onChange={value => handleInputChange('displayDuration', value)}
              suffix={
                <TextField
                  value={input.displayDuration && String(input.displayDuration)}
                  onChange={value => handleInputChange('displayDuration', value)}
                  suffix="second(s)"
                />
              }
            />
            <RangeSlider
              helpText="How long each pop will display on your app"
              output
              label="Time before the first pop"
              min={0}
              max={100}
              value={input.firstDelay || 0}
              onChange={value => handleInputChange('firstDelay', value)}
              suffix={
                <TextField
                  value={
                    input.firstDelay && (input.firstDelay > 100 ? '100' : String(input.firstDelay))
                  }
                  onChange={value => handleInputChange('firstDelay', value)}
                  suffix="second(s)"
                />
              }
            />
          </FormLayout.Group>
          <FormLayout.Group>
            <RangeSlider
              helpText="How long each pop will display on your app"
              output
              label="Gap time between two pops"
              min={0}
              max={100}
              value={input.popsInterval || 0}
              onChange={value => handleInputChange('popsInterval', value)}
              suffix={
                <TextField
                  value={
                    input.popsInterval &&
                    (input.popsInterval > 100 ? '100' : String(input.popsInterval))
                  }
                  onChange={value => handleInputChange('popsInterval', value)}
                  suffix="second(s)"
                />
              }
            />

            <RangeSlider
              helpText="How long each pop will display on your app"
              output
              label="Maximum of popups"
              min={0}
              max={100}
              value={input.maxPopsDisplay || 0}
              onChange={value => handleInputChange('maxPopsDisplay', value)}
              suffix={
                <TextField
                  value={
                    input.maxPopsDisplay &&
                    (input.maxPopsDisplay > 100
                      ? () => {
                        return;
                      }
                      : String(input.maxPopsDisplay))
                  }
                  onChange={value => handleInputChange('maxPopsDisplay', value)}
                  suffix="second(s)"
                />
              }
            />
          </FormLayout.Group>
        </FormLayout>
      </Card.Section>
    </>
  );
};

const Skeleton = () => {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText/>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small"/>
              <SkeletonBodyText/>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small"/>
                <SkeletonBodyText lines={2}/>
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={1}/>
            </Card.Section>
          </Card>
          <Card subdued>
            <Card.Section>
              <TextContainer>
                <SkeletonDisplayText size="small"/>
                <SkeletonBodyText lines={2}/>
              </TextContainer>
            </Card.Section>
            <Card.Section>
              <SkeletonBodyText lines={2}/>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};
