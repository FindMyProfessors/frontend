import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query (
    $schoolId: ID!
    $input: TermInput!
    $after: String
    $searchQuery: String
  ) {
    school(id: $schoolId) {
      courses(
        term: $input
        first: 50
        after: $after
        filter: { startsWith: $searchQuery }
      ) {
        courses {
          id
          name
          code
        }
        pageInfo {
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

export const GET_SCHOOLS = gql`
  query {
    schools(first: 50) {
      schools {
        id
        name
      }
      totalCount
    }
  }
`;

export const GET_PROFESSORS = gql`
  query (
    $courseId: ID!
    $termInput: TermInput!
    $professorAmount: Int!
    $professorAfter: String
  ) {
    course(id: $courseId) {
      taughtBy(
        term: $termInput
        first: $professorAmount
        after: $professorAfter
      ) {
        professors {
          id
          firstName
          lastName
          rating(topKPercentage: 0.25) {
            ratingAmount
            averageGrade
            totalQualityAverage
            totalDifficultyAverage
            topKMostRecentQualityAverage
            topKMostRecentDifficultyAverage
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  }
`;

export const GET_PROFESSOR_ANALYSIS = gql`
  query ($professorId: ID!) {
    professor(id: $professorId) {
      analysis {
        averageRatingValues {
          year
          month
          value
        }
        tagAmount {
          amount
          tag
        }
      }
    }
  }
`;
