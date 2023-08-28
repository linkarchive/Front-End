import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import API from '@/api/API';
import useDebounce from '@/hooks/useDebounce';
import TextInput from '@/components/Create/TextInput';
import { ERROR_MESSAGE, validateUrl } from '@/utils/Create/validation';
import { Block } from '@/components/Create/Create.styled';

const UrlInput = ({
  value,
  onInputChange,
  onUrlFetchSuccess,
  watchLoadingState,
}: {
  value: string;
  onInputChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlFetchSuccess: (data: unknown) => void;
  watchLoadingState?: (isLoading: boolean) => void;
}) => {
  const [url, setUrl] = useState(value);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedUrl = useDebounce(url, 2000);

  const { mutate: fetchMetaData, isLoading } = useMutation({
    mutationFn: API.getLinkMetadata,
    onSuccess: (data_) => {
      onUrlFetchSuccess(data_);
      setErrorMessage('');
    },
    onError: () => {
      setErrorMessage(ERROR_MESSAGE.URL.INVALID);
    },
  });

  useEffect(() => {
    if (watchLoadingState) watchLoadingState(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleFetchURL = () => {
    if (isLoading) return;

    const urlErrorMsg = validateUrl(url);
    if (!urlErrorMsg) {
      fetchMetaData(url);
    } else {
      setErrorMessage(urlErrorMsg);
    }
  };

  useEffect(() => {
    if (debouncedUrl) {
      handleFetchURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedUrl]);

  return (
    <Block style={{ marginBottom: '14px' }}>
      <TextInput
        id='url'
        label='링크'
        placeholder='URL을 입력하거나 복사한 URL을 입력해주세요.'
        errorMessage={errorMessage}
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          onInputChange(e);
        }}
        onClear={() => {
          setUrl('');
          onInputChange();
        }}
      />
    </Block>
  );
};

export default UrlInput;
