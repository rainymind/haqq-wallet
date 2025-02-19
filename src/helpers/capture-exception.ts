import * as Sentry from '@sentry/react-native';
import {Alert, Linking} from 'react-native';

export const captureException = (
  error: unknown,
  source: string = 'unknown',
  context: any = {},
) => {
  if (!error) {
    console.log(
      source,
      'captureException called with missing or incorrect arguments',
    );
    console.trace();
    return;
  }
  console.error('captureException', source, error, context);
  try {
    Sentry.captureException(error, {
      tags: {source},
      extra: context,
    });
  } catch (e) {
    console.error(
      'captureException send error',
      source,
      error,
      context,
      // @ts-ignore
      e.message,
    );
  }
};

export const openURL = async (url: string) => {
  // Checking if the link is supported for links with custom URL scheme.
  const openAlert = () => {
    Alert.alert('Sorry, We could not open that link:', url);
  };
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened by some browser in the mobile
      await Linking.openURL(url);
    } else {
      openAlert();
    }
  } catch (error) {
    openAlert();
    captureException(error, 'openURL');
  }
};
