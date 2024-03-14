import React from "react";
import { useTabState, Tab as ReakitTab, TabList, TabPanel } from "reakit/Tab";
import NamePicker from "./JsonBuilderDemo";
import URLInjection from "./URLInjection";
import { XssTab } from "./XssTab";

const Tab = () => {
  const tab = useTabState();
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <ReakitTab {...tab}>Vuln Dependencies</ReakitTab>
        <ReakitTab {...tab}>
          URL Injection
        </ReakitTab>
        <ReakitTab {...tab}>Xss</ReakitTab>
      </TabList>
      <TabPanel {...tab}>
        <NamePicker />
      </TabPanel>
      <TabPanel {...tab}>
        <URLInjection />
      </TabPanel>
      <TabPanel {...tab}>
        <XssTab />
      </TabPanel>
    </>
  );
}
export default Tab;