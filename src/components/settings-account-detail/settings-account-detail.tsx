import React from 'react';

import {Switch, View, useWindowDimensions} from 'react-native';

import {Color} from '@app/colors';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  Card,
  CardMask,
  DataContent,
  First,
  Icon,
  InfoBlock,
  MenuNavigationButton,
  PopupContainer,
  Spacer,
  Text,
} from '@app/components/ui';
import {createTheme} from '@app/helpers';
import {Feature, isFeatureEnabled} from '@app/helpers/is-feature-enabled';
import {I18N} from '@app/i18n';
import {Wallet} from '@app/models/wallet';
import {WalletType} from '@app/types';

type SettingsAccountDetailProps = {
  wallet: Wallet;
  onPressRename: () => void;
  onPressStyle: () => void;
  onToggleIsHidden: () => void;
  onViewingRecoveryPhrase: () => void;
  onPressPharse(): void;
  onPressSocial(): void;
};

export const SettingsAccountDetail = ({
  wallet,
  onPressRename,
  onPressStyle,
  onToggleIsHidden,
  onViewingRecoveryPhrase,
  onPressPharse,
  onPressSocial,
}: SettingsAccountDetailProps) => {
  const cardWidth = useWindowDimensions().width - 72;
  const cardMaskWidth = useWindowDimensions().width - 112;
  const cardMaskHeight = cardMaskWidth * 0.547528517;

  return (
    <PopupContainer style={styles.container}>
      <View style={[styles.header, wallet.isHidden && styles.opacity]}>
        <Card
          width={cardWidth}
          height={cardMaskHeight + 40}
          style={styles.card}
          pattern={wallet.pattern}
          colorFrom={wallet.colorFrom}
          colorTo={wallet.colorTo}
          colorPattern={wallet.colorPattern}>
          <CardMask
            style={[
              styles.cardMask,
              {width: cardMaskWidth, height: cardMaskHeight},
            ]}
          />
        </Card>
        <Text t10 style={styles.headerName}>
          {wallet.name}
        </Text>
        <Text t14>{wallet?.address}</Text>
      </View>
      {isFeatureEnabled(Feature.sss) && (
        <First>
          {!wallet.mnemonicSaved && wallet.type === WalletType.mnemonic && (
            <InfoBlock
              border
              warning
              icon={<Icon name={'warning'} color={Color.textYellow1} />}
              i18n={I18N.settingsAccountDetailRecoveryWarning}
              bottomContainerStyle={styles.row}
              bottom={
                <>
                  <Button
                    style={styles.button}
                    size={ButtonSize.small}
                    i18n={I18N.settingsAccountDetailPharse}
                    variant={ButtonVariant.second}
                    onPress={onPressPharse}
                  />
                  <Spacer width={10} />
                  <Button
                    style={styles.button}
                    size={ButtonSize.small}
                    i18n={I18N.settingsAccountDetailSocial}
                    variant={ButtonVariant.second}
                    onPress={onPressSocial}
                  />
                </>
              }
            />
          )}
          {wallet.type === WalletType.mnemonic && (
            <InfoBlock
              border
              icon={<Icon name={'warning'} color={Color.graphicBase1} />}
              i18n={I18N.settingsAccountDetailRecoverySocialWarning}
              bottomContainerStyle={styles.row}
              bottom={
                <>
                  <Button
                    style={styles.button}
                    size={ButtonSize.small}
                    i18n={I18N.settingsAccountDetailConnectSocialLogin}
                    variant={ButtonVariant.second}
                    onPress={onPressSocial}
                  />
                </>
              }
            />
          )}
          {!wallet.mnemonicSaved && (
            <InfoBlock
              border
              icon={<Icon name={'warning'} color={Color.graphicBase1} />}
              i18n={I18N.settingsAccountDetailRecoveryPharseWarning}
              bottomContainerStyle={styles.row}
              bottom={
                <>
                  <Button
                    style={styles.button}
                    size={ButtonSize.small}
                    i18n={I18N.settingsAccountDetailCreateBackupPhrase}
                    variant={ButtonVariant.second}
                    onPress={onPressPharse}
                  />
                </>
              }
            />
          )}
        </First>
      )}
      <MenuNavigationButton onPress={onPressRename}>
        <DataContent
          titleI18n={I18N.settingsAccountDetailRenameTitle}
          subtitleI18n={I18N.settingsAccountDetailRenameSubtitle}
        />
      </MenuNavigationButton>
      <MenuNavigationButton onPress={onPressStyle}>
        <DataContent
          titleI18n={I18N.settingsAccountDetailChangeStyleTitle}
          subtitleI18n={I18N.settingsAccountDetailChangeStyleSubtitle}
        />
      </MenuNavigationButton>
      {wallet.type === WalletType.mnemonic && wallet.accountId && (
        <MenuNavigationButton onPress={onViewingRecoveryPhrase}>
          <DataContent
            titleI18n={I18N.settingsAccountDetailViewRecoveryPhraseTitle}
            subtitleI18n={I18N.settingsAccountDetailViewRecoveryPhraseSubtitle}
          />
        </MenuNavigationButton>
      )}
      <MenuNavigationButton hideArrow>
        <DataContent
          titleI18n={I18N.settingsAccountDetailHideTitle}
          subtitleI18n={I18N.settingsAccountDetailHideSubtitle}
        />
        <Spacer />
        <Switch value={wallet.isHidden} onChange={onToggleIsHidden} />
      </MenuNavigationButton>
    </PopupContainer>
  );
};

const styles = createTheme({
  row: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
  card: {
    marginBottom: 12,
  },
  container: {
    marginHorizontal: 20,
  },
  header: {
    marginTop: 15,
    backgroundColor: Color.bg8,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 10,
  },
  headerName: {
    marginBottom: 4,
  },
  cardMask: {margin: 4},
  opacity: {opacity: 0.5},
});
