import styled from "@emotion/styled"

export const BlogContainer = styled.div`
  max-width: 54rem;
  margin-left: auto;
  margin-right: auto;

  font-size: 1.125rem;
  line-height: 1.8;

  h2,
  h3,
  h4 {
    color: white;
  }

  .metadata {
    font-size: 1rem;
    color: var(--light-text-color);
  }

  a {
    color: var(--light-text-color);
    border-color: var(--light-text-color);
  }

  ul {
    li {
      margin-bottom: 0.25rem;
      p {
        margin: 0;
      }
      ul {
        margin-top: 0;
      }
    }
  }
  table {
    background: hsl(0deg 0% 33.73% / 8%);
    line-height: 1rem;

    tr {
      &:first-of-type {
        th,
        td {
          border-bottom: 2px solid hsl(0deg 0% 100% / 19%);
        }
      }
      &:last-of-type {
        th,
        td {
          border-bottom: 0px solid red;
        }
      }
    }
    td,
    th {
      border-bottom: 1px solid hsl(0deg 0% 100% / 19%);

      &:first-of-type,
      &:last-of-type {
        padding: 0 1rem;
      }
    }
  }

  code {
    font-family:
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      Liberation Mono,
      Courier New,
      monospace;

    padding: 0.2rem 0.3rem;
    background-color: #2d3748;
    border-radius: 6px;
    font-size: 0.875em;

    &:before,
    &:after {
      content: "\u0060" !important;
    }
  }
  hr {
    margin-bottom: calc(2.45rem - 1px);
  }
`
