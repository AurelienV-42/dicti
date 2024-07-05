import * as Sentry from "@sentry/react-native";
import * as Application from "expo-application";
import * as Updates from "expo-updates";

Sentry.init({
  release:
    "dicti@" +
    Application.nativeApplicationVersion +
    "Update:" +
    Updates.updateId,
  dsn: "https://f9e3f6111205d9dc07e7ea3809a87131@o4507517355819008.ingest.de.sentry.io/4507517358374992",
  tracesSampleRate: 1.0,
  enabled: !__DEV__,
});

export const myCaptureException = (error: Error) => {
  Sentry.captureException(error);
};
