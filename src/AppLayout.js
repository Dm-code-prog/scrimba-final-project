import { S } from './style';
import { ReactComponent as LemonBlob } from './assets/lemon-blob.svg';
import { ReactComponent as BabyBlob } from './assets/baby-blob.svg';

export const AppLayout = ({ children, quizStarted }) => {
    return (
        <S.AppContainer>
            <S.BlobContainer.lemon quizStarted={quizStarted}>
                <LemonBlob />
            </S.BlobContainer.lemon>
            <S.BlobContainer.baby quizStarted={quizStarted}>
                <BabyBlob />
            </S.BlobContainer.baby>
            {children}
        </S.AppContainer>
    );
};
