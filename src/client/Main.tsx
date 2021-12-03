import React, { lazy, Suspense } from "react";

import AuthComponent from "./auth/AuthComponent";
import { Segment, Tab } from "semantic-ui-react";
import Footer from "./common/Footer";

const ScenarioComponent = lazy(() => import("./scenario/ScenarioComponent"));
const YmlComponent = lazy(() => import("./yml/pages/YmlComponent"));

const Main = () => {
  const panes = [
    {
      menuItem: "Заведение операций",
      render: () => (
        <Tab.Pane as="div">
          <Suspense fallback={<div>Загрузка...</div>}>
            <ScenarioComponent />
          </Suspense>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Импорт YML фидов",
      render: () => (
        <Tab.Pane as="div">
          <Suspense fallback={<div>Загрузка...</div>}>
            <YmlComponent />
          </Suspense>
        </Tab.Pane>
      ),
    },
  ];

  const TabbedContent = () => (
    <Tab
      menu={{ fluid: true, vertical: true }}
      panes={panes}
      grid={{ paneWidth: 13, tabWidth: 3 }}
    />
  );

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Segment basic style={{ flexGrow: 0 }}>
        <AuthComponent />
      </Segment>
      <Segment basic style={{ flexGrow: 3 }}>
        {TabbedContent()}
      </Segment>
      <Segment inverted vertical style={{ padding: "3em 0em" }}>
        <Footer />
      </Segment>
    </div>
  );
};

export default Main;
