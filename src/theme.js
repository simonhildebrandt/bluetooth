import { extendTheme } from "@chakra-ui/react"

export default theme = extendTheme({
  fonts: {
    body: "Quattrocento Sans, sans-serif",
    heading: "Quattrocento, serif"
  },
  textStyles: {
    quote: {
      fontStyle: 'italic',
      mb: 12,
    }
  },
  components: {
    Text: {
      baseStyle: {
        my: 4,
        fontSize: ['16px', '24px']
      }
    },
    List: {
      baseStyle: {
        item: {
          fontSize: ['16px', '24px']
        }
      }
    },
    Heading: {
      sizes: {
        lg: {
          my: 4
        }
      }
    }
  }
});

