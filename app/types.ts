export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  RFC3339Time: any;
};

export enum Semester {
  Fall = "FALL",
  Spring = "SPRING",
  Summer = "SUMMER",
}

export type TermInput = {
  year: Scalars["Int"];
  semester: Semester;
};

export type CourseFilter = {
  startsWith?: Maybe<Scalars["String"]>;
};

export type School = {
  __typename?: "School";
  id: Scalars["ID"];
  name: Scalars["String"];
  /** Returns a list of professors that teach at this school */
  courseCodes: Array<Maybe<Scalars["String"]>>;
  courses: CourseConnection;
  professors: ProfessorConnection;
};

export type SchoolCourseCodesArgs = {
  term: TermInput;
};

export type SchoolCoursesArgs = {
  term: TermInput;
  filter?: Maybe<CourseFilter>;
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type SchoolProfessorsArgs = {
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type Professor = {
  __typename?: "Professor";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  linked: Scalars["Boolean"];
  rating?: Maybe<Rating>;
  analysis?: Maybe<ProfessorAnalysis>;
  school: School;
  reviews: ReviewConnection;
  teaches: CourseConnection;
};

export type ProfessorRatingArgs = {
  topKPercentage?: Maybe<Scalars["Float"]>;
};

export type ProfessorReviewsArgs = {
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type ProfessorTeachesArgs = {
  term: TermInput;
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type Rating = {
  __typename?: "Rating";
  ratingAmount: Scalars["Int"];
  totalQualityAverage: Scalars["Float"];
  topKMostRecentQualityAverage: Scalars["Float"];
  totalDifficultyAverage: Scalars["Float"];
  topKMostRecentDifficultyAverage: Scalars["Float"];
  averageGrade: Grade;
};

export type TagAmount = {
  __typename?: "TagAmount";
  tag: Tag;
  amount: Scalars["Int"];
};

export type ChartValue = {
  __typename?: "ChartValue";
  value: Scalars["Float"];
  month: Scalars["String"];
  year: Scalars["Int"];
};

export type ProfessorAnalysis = {
  __typename?: "ProfessorAnalysis";
  tagAmount: Array<TagAmount>;
  averageRatingValues?: Maybe<Array<ChartValue>>;
};

export type Course = {
  __typename?: "Course";
  id: Scalars["ID"];
  name: Scalars["String"];
  code: Scalars["String"];
  school?: Maybe<School>;
  taughtBy?: Maybe<ProfessorConnection>;
};

export type CourseTaughtByArgs = {
  term: TermInput;
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type NewCourse = {
  name: Scalars["String"];
  code: Scalars["String"];
};

export enum Grade {
  APlus = "A_PLUS",
  A = "A",
  AMinus = "A_MINUS",
  BPlus = "B_PLUS",
  B = "B",
  BMinus = "B_MINUS",
  CPlus = "C_PLUS",
  C = "C",
  CMinus = "C_MINUS",
  DPlus = "D_PLUS",
  D = "D",
  DMinus = "D_MINUS",
  FPlus = "F_PLUS",
  F = "F",
  FMinus = "F_MINUS",
  Incomplete = "INCOMPLETE",
  Withdrawn = "WITHDRAWN",
  NotSure = "NOT_SURE",
  Other = "OTHER",
}

export enum Tag {
  ToughGrader = "TOUGH_GRADER",
  GetReadyToRead = "GET_READY_TO_READ",
  ParticipationMatters = "PARTICIPATION_MATTERS",
  ExtraCredit = "EXTRA_CREDIT",
  GroupProjects = "GROUP_PROJECTS",
  AmazingLectures = "AMAZING_LECTURES",
  ClearGradingCriteria = "CLEAR_GRADING_CRITERIA",
  GivesGoodFeedback = "GIVES_GOOD_FEEDBACK",
  Inspirational = "INSPIRATIONAL",
  LotsOfHomework = "LOTS_OF_HOMEWORK",
  Hilarious = "HILARIOUS",
  BewareOfPopQuizzes = "BEWARE_OF_POP_QUIZZES",
  SoManyPapers = "SO_MANY_PAPERS",
  Caring = "CARING",
  Respected = "RESPECTED",
  LectureHeavy = "LECTURE_HEAVY",
  GradedByFewThings = "GRADED_BY_FEW_THINGS",
  AccessibleOutsideClass = "ACCESSIBLE_OUTSIDE_CLASS",
  OnlineSavvy = "ONLINE_SAVVY",
  TestsAreTough = "TESTS_ARE_TOUGH",
  TestHeavy = "TEST_HEAVY",
  WouldTakeAgain = "WOULD_TAKE_AGAIN",
  TestsNotMany = "TESTS_NOT_MANY",
  SkipClassYouWontPass = "SKIP_CLASS_YOU_WONT_PASS",
  CaresAboutStudents = "CARES_ABOUT_STUDENTS",
  RespectedByStudents = "RESPECTED_BY_STUDENTS",
  ExtraCreditOffered = "EXTRA_CREDIT_OFFERED",
}

export type Review = {
  __typename?: "Review";
  id: Scalars["ID"];
  quality: Scalars["Float"];
  difficulty: Scalars["Float"];
  time: Scalars["RFC3339Time"];
  tags: Array<Tag>;
  grade: Grade;
};

export type NewReview = {
  quality: Scalars["Float"];
  difficulty: Scalars["Float"];
  time: Scalars["RFC3339Time"];
  tags: Array<Tag>;
  grade: Grade;
};

export type NewProfessor = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  rmpId?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  professorByRMPId?: Maybe<Professor>;
  professor?: Maybe<Professor>;
  course?: Maybe<Course>;
  school?: Maybe<School>;
  schools: SchoolConnection;
  professors: ProfessorConnection;
};

export type QueryProfessorByRmpIdArgs = {
  rmpId: Scalars["String"];
};

export type QueryProfessorArgs = {
  id: Scalars["ID"];
};

export type QueryCourseArgs = {
  id: Scalars["ID"];
};

export type QuerySchoolArgs = {
  id: Scalars["ID"];
};

export type QuerySchoolsArgs = {
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type QueryProfessorsArgs = {
  schoolId: Scalars["ID"];
  first?: Scalars["Int"];
  after?: Maybe<Scalars["String"]>;
};

export type NewSchool = {
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createSchool?: Maybe<School>;
  createProfessor?: Maybe<Professor>;
  createCourse?: Maybe<Course>;
  createReview?: Maybe<Review>;
  registerProfessorForCourse: Scalars["Boolean"];
  mergeProfessor?: Maybe<Professor>;
};

export type MutationCreateSchoolArgs = {
  input: NewSchool;
};

export type MutationCreateProfessorArgs = {
  schoolId: Scalars["ID"];
  input: NewProfessor;
};

export type MutationCreateCourseArgs = {
  schoolId: Scalars["ID"];
  input: NewCourse;
};

export type MutationCreateReviewArgs = {
  professorId: Scalars["ID"];
  input: NewReview;
};

export type MutationRegisterProfessorForCourseArgs = {
  courseId: Scalars["ID"];
  professorId: Scalars["ID"];
  term: TermInput;
};

export type MutationMergeProfessorArgs = {
  schoolProfessorId: Scalars["ID"];
  rmpProfessorId: Scalars["ID"];
  input: NewProfessor;
};

export type Connection = {
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
};

export type PageInfo = {
  __typename?: "PageInfo";
  startCursor: Scalars["String"];
  endCursor: Scalars["String"];
  hasNextPage: Scalars["Boolean"];
};

export type SchoolConnection = Connection & {
  __typename?: "SchoolConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  schools: Array<School>;
};

export type ProfessorConnection = Connection & {
  __typename?: "ProfessorConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  professors: Array<Professor>;
};

export type CourseConnection = Connection & {
  __typename?: "CourseConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  courses: Array<Course>;
};

export type ReviewConnection = Connection & {
  __typename?: "ReviewConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  reviews: Array<Review>;
};
