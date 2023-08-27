import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '@/api/API';
import { useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { MetaData } from '@/components/LinkItem';
import { setAccessToken } from '@/api/customAPI';
import { withAuthProps, withAuth } from '@/lib/withAuth';
import { Tag } from '@/components/Common/Tag/BaseTag';
import useToastBar from '@/hooks/useToastBar';
import UrlInput from '@/components/Create/UrlInput';
import LinkPreivew from '@/components/Create/LinkPreview';
import MyHashTag from '@/components/Create/MyHashTag';
import HashTagInput from '@/components/Create/HashTagInput';
import TitleInput from '@/components/Create/TitleInput';

export const getServerSideProps = withAuth();

const Create = ({ userId, accessToken }: withAuthProps) => {
  const router = useRouter();

  setAccessToken(accessToken);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(routerSlice.actions.loadCreatePage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [hashtagList, setHashtagList] = useState<Tag[]>([]);
  const [metaData, setMetaData] = useState<MetaData>(null);
  const [isValid, setIsValid] = useState(false);
  const [nextTagId, setNextTagId] = useState(0);
  const [isUrlFetchLoading, setIsUrlFetchLoading] = useState(false);

  const { createToastMessage } = useToastBar();

  const createLink = useMutation({ mutationFn: API.createLink });
  const handleCreate = () => {
    if (createLink.isLoading) return;

    const tagNameList = hashtagList.map((tag) => tag.tagName);

    const [thumbnail, description, tagList] = [
      metaData?.metaThumbnail,
      truncateDesc(metaData?.metaDescription),
      [...tagNameList],
    ];

    if (!isValid) return;

    createLink.mutate(
      { url, title, description, thumbnail, tagList },
      {
        onSuccess: () => {
          createToastMessage('링크가 추가되었습니다.');
          router.push('/');
        },
      }
    );
  };

  useEffect(() => {
    const flag = url && title && metaData !== null;
    setIsValid(flag);
  }, [url, title, metaData]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <UrlInput
        value={url}
        onUrlFetchSuccess={(data) => {
          const d = data as MetaData;
          setMetaData(d);
          setTitle(d.metaTitle);
        }}
        onInputChange={(e) => {
          if (e) setUrl(e.target.value);
          else setUrl('');
        }}
        watchLoadingState={(loadingState) => setIsUrlFetchLoading(loadingState)}
      />

      <TitleInput value={title} onChange={(e) => setTitle(e?.target?.value)} />

      <LinkPreivew isLoading={isUrlFetchLoading} metaData={metaData} />

      <HashTagInput
        nextTagId={nextTagId}
        setNextTagId={setNextTagId}
        hashtagList={hashtagList}
        onChageHashTag={(hashtagList_) => setHashtagList(hashtagList_)}
      />

      <MyHashTag
        nextTagId={nextTagId}
        setNextTagId={setNextTagId}
        userId={userId}
        hashtagList={hashtagList}
        onHashTagClick={(tag) => setHashtagList((prev) => [...prev, tag])}
      />

      <ButtonBlock>
        <Button type='submit' disabled={!isValid}>
          완료
        </Button>
      </ButtonBlock>
    </Form>
  );
};

export default Create;

const Form = styled.form`
  padding: 16px 16px 0;
`;

const ButtonBlock = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 70px;

  width: '40px';
  padding-bottom: 29px;
`;

const Button = styled.button`
  width: 343px;
  height: 53px;
  border-radius: 10px;

  background: ${({ theme }) => theme.primary.main};

  color: ${({ theme }) => theme.common.white};
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  &:disabled {
    background: ${({ theme }) => theme.gray.lighterGray};
  }
`;

/** 설명은 500자 제한 */
function truncateDesc(str) {
  if (str.length > 500) {
    return `${str.slice(0, 500)}`;
  }
  return str;
}
