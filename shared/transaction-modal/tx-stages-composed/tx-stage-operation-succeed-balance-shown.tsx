import styled from 'styled-components';

import { InlineLoader } from '@lidofinance/lido-ui';
import { L2LowFee } from 'shared/banners/l2-low-fee';
import { TxAmount } from '../tx-stages-parts/tx-amount';
import { SuccessText } from '../tx-stages-parts/success-text';
import { TxStageSuccess } from '../tx-stages-basic';

import type { BigNumber } from 'ethers';

export const SkeletonBalance = styled(InlineLoader).attrs({
  color: 'text',
})`
  margin-left: ${({ theme }) => theme.spaceMap.xs}px;
  width: 100px;
`;

type TxStageOperationSucceedBalanceShownProps = {
  balance?: BigNumber;
  balanceToken: string;
  operationText: string;
  txHash?: string;
};

export const TxStageOperationSucceedBalanceShown = ({
  balance,
  balanceToken,
  operationText,
  txHash,
}: TxStageOperationSucceedBalanceShownProps) => {
  const balanceEl = balance && (
    <TxAmount amount={balance} symbol={balanceToken} />
  );

  return (
    <TxStageSuccess
      txHash={txHash}
      title={
        <>
          Your new balance is <wbr />
          {balance ? balanceEl : <SkeletonBalance />}
        </>
      }
      description={
        <SuccessText operationText={operationText} txHash={txHash} />
      }
      showEtherscan={false}
      footer={
        balanceToken === 'stKONET' || balanceToken === 'wstKONET' ? (
          <L2LowFee token={balanceToken} />
        ) : undefined
      }
    />
  );
};
