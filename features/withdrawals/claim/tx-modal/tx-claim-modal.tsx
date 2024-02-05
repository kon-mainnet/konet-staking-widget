import { useMemo } from 'react';

import {
  TxStageModal,
  TxStagePending,
  TxStageSuccess,
  TxStageSuccessMultisig,
  TxStageSign,
  TxStageFail,
} from 'features/withdrawals/shared/tx-stage-modal';
import { useTransactionModal, TX_STAGE } from 'shared/transaction-modal';
import {
  trackMatomoEvent,
  MATOMO_CLICK_EVENTS_TYPES,
} from 'config/trackMatomoEvent';
import { FormatToken } from 'shared/formatters';

export const TxClaimModal = () => {
  const {
    isModalOpen,
    txStage,
    amount,
    txHash,
    errorText,
    onRetry,
    dispatchModalState,
  } = useTransactionModal();

  const content = useMemo(() => {
    const amountEl = amount && (
      <FormatToken
        amount={amount}
        symbol={'ETH'}
        adaptiveDecimals
        trimEllipsis
      />
    );

    const successDescription = 'Claiming operation was successful';
    const successTitle = <>{amountEl} ETH has been claimed</>;

    const pendingDescription = 'Awaiting block confirmation';
    const pendingTitle = <>You are now claiming {amountEl} ETH</>;

    const signDescription = 'Processing your request';
    const signTitle = <>You are now claiming {amountEl} ETH</>;

    switch (txStage) {
      case TX_STAGE.SIGN:
        return <TxStageSign description={signDescription} title={signTitle} />;
      case TX_STAGE.BLOCK:
        return (
          <TxStagePending
            description={pendingDescription}
            title={pendingTitle}
            txHash={txHash}
          />
        );
      case TX_STAGE.SUCCESS:
        return (
          <TxStageSuccess
            description={successDescription}
            title={successTitle}
            txHash={txHash}
            onClickEtherscan={() =>
              trackMatomoEvent(
                MATOMO_CLICK_EVENTS_TYPES.claimViewOnEtherscanSuccessTemplate,
              )
            }
          />
        );
      case TX_STAGE.SUCCESS_MULTISIG:
        return <TxStageSuccessMultisig />;
      case TX_STAGE.FAIL:
        return (
          <TxStageFail failedText={errorText} onClick={onRetry ?? undefined} />
        );
      default:
        return null;
    }
  }, [amount, txStage, txHash, errorText, onRetry]);

  return (
    <TxStageModal
      open={isModalOpen}
      onClose={() => dispatchModalState({ type: 'close_modal' })}
      txStage={txStage}
    >
      {content}
    </TxStageModal>
  );
};
