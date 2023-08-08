import API from '@/api/API';
import { persistor, useAppDispatch } from '@/store';
import { routerSlice } from '@/store/slices/routerSlice';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import LinkTo from '../../components/Settings/LinkTo';
import ProfileCard from '@/components/Settings/ProfileCard';
import { withAuth, withAuthProps } from '@/lib/withAuth';
import { setAccessToken } from '@/api/customAPI';
import { useQuery } from '@tanstack/react-query';

export const getServerSideProps = withAuth();

const Settings = ({ accessToken, userId }: withAuthProps) => {
  setAccessToken(accessToken);
  const dispatch = useAppDispatch();

  const Logout = async () => {
    try {
      await API.deleteAllCookies();
      persistor.purge();
      window.location.href = '/';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => API.getUserProfile(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    dispatch(routerSlice.actions.loadProfilePage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <ProfileCard {...data} />

        <Wrapper>
          <Title>관리</Title>
          <LinkTo href='/settings/hashtag' title='해시태그 관리' border />
          <LinkTo href='' title='연결된 SNS 계정' content='카카오계정' border />
          <LinkTo href='/settings/trash' title='삭제 링크 • 마크 목록' />
        </Wrapper>
        <Wrapper>
          <Title>문의</Title>
          <LinkTo href='' title='링크 • 마크하는 방법' border />
          <LinkTo href='' title='자주 묻는 질문' />
        </Wrapper>
      </Container>
      <DangerZone>
        <DangerContent onClick={Logout}>로그아웃</DangerContent>
        <DangerContent>서비스탈퇴</DangerContent>
      </DangerZone>
    </>
  );
};

const Container = styled.main`
  padding: 0 16px;
`;

const Wrapper = styled.section`
  padding: 10px 0;
`;
const Title = styled.h2`
  padding: 10px 0;

  color: ${({ theme }) => theme.gray.lightGray};
  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;
`;

const DangerZone = styled.div`
  width: 100%;
  border-top: 8px solid #f5f5f5;
  padding: 10px 16px;
`;

const DangerContent = styled.h3`
  padding: 10px 0;

  color: ${({ theme }) => theme.gray.lightGray};
  font-weight: 500;
  font-size: 14px;
  line-height: 18.2px;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.primary.main};
  }
`;

export default Settings;
