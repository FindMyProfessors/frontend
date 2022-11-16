import { gql } from "@apollo/client";
import { Course } from "app/types";
import { client } from "./client";

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
          endCursor
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
        pageInfo {
          hasNextPage
        }
        totalCount
      }
    }
  }
`;

export const getAllCourses = async () => {
  let allCourses: Course[] = [];
  let hasNextPage = true;
  let endCursor;


  while (hasNextPage) {
    const { data } = (await client.query({
      query: GET_COURSES,
      variables: {
        schoolId: "1",
        input: {
          semester: "SPRING",
          year: 2023,
        },
        after: endCursor,
      },
    })) as { data: any };

    let courses: Course[] = data.school.courses.courses;
    allCourses = [...allCourses, ...courses];
    hasNextPage = data.school.courses.pageInfo.hasNextPage;
    if (hasNextPage) endCursor = data.school.courses.pageInfo.endCursor;
  }

  return allCourses;
};
