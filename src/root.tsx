// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import { api, queryClient } from "~/utils/api";
import "./root.css";
import { AuthProvider } from "./contexts/auth";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>FlightOwl</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <api.Provider queryClient={queryClient}>
            <AuthProvider profile={null}>
              <ErrorBoundary>
                <Routes>
                  <FileRoutes />
                </Routes>
              </ErrorBoundary>
            </AuthProvider>
          </api.Provider>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
